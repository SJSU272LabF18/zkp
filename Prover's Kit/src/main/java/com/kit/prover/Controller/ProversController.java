package com.kit.prover.Controller;

import com.kit.prover.Amazon_S3.Download;
import com.kit.prover.Amazon_S3.Upload;
import com.kit.prover.Helpers.ParseBalanceHelper;
import com.kit.prover.zeroknowledge.prover.TTPDemo;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.File;
import java.io.IOException;
import java.math.BigInteger;

@Controller
public class ProversController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping(path="/user/{id}")
    public @ResponseBody String index(@PathVariable("id") String uid) {

        System.out.println("unique_doc_id is: "+uid);

        Iterable<Prover> provers = userRepository.findAll();

        Prover prover = null;
        for (Prover p: provers) {
            if(p.getUnique_doc_id().equalsIgnoreCase(uid)) {
                prover = p;
                break;
            }
        }

        try {
            Download download = new Download();
            download.getTheFile("Confirmation_letter.pdf");  //prover.getUnique_doc_id()
        }
        catch (IOException e) {
            System.out.println("Error occured while fetching the file from Amazon S3");
        }

        StringBuilder sb = new StringBuilder();
        try {
            PDDocument document = PDDocument.load(new File("D:\\CMPE-272\\Confirmation_letter.pdf"));
            if (!document.isEncrypted()) {
                PDFTextStripper stripper = new PDFTextStripper();
                String text = stripper.getText(document);
                sb.append(text);
            }
            document.close();
        }
        catch(Exception e) {
            System.out.println("File is either not present or is corrupted");
        }

        ParseBalanceHelper parseBalanceHelper = new ParseBalanceHelper();
        String balance = parseBalanceHelper.getBalanceFromConfirmationLetter(sb.toString());

        new TTPDemo().generateTrustedMessage(new BigInteger(balance));

        try {
            Upload upload = new Upload();
            upload.uploadTheFile();
        }
        catch (IOException e) {
            System.out.println("Error occurred while uploading the file to S3.");
        }
        System.out.println("Generated the proof successfully!!");
        return "Range proof has been generated successfully";
    }


    //Just to add a dummy value in the table
    @GetMapping(path="/add")
    public @ResponseBody String addNewUser () {

        Prover prover = new Prover();
        prover.setUsername("shubham.sawant@sjsu.edu");
        prover.setPassword("jsjh#hbsdh");
        prover.setDoc_type("balance_proof");
        prover.setUnique_doc_id("234567");
        prover.setType("Prover");
        userRepository.save(prover);
        return "Saved";
    }

}
