package com.kit.prover.Controller;

import com.kit.prover.Helpers.ParseBalanceHelper;
import com.kit.prover.zeroknowledge.prover.TTPDemo;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.math.BigInteger;

@RestController
public class ProversController {

    @GetMapping("/")
    public String index() {
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

        return String.valueOf(balance);
    }

}
