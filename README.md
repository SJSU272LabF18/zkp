# Project-Team-24

### Student Names:
  * Amit Bharadia
  * Nitish Joshi
  * Rohan Kamat
  * Shubham Sawant

### Team Name: Code Monks

### Idea: Zero knowledge proof authentication for various usecases (Age Confirmation, Bank Balance verification)
* https://zkp.science/

### Current Situation: (The problem)

* Consider following cases:
1. John is travelling to USA, and at immigration check an officer asks him his passport for verification.
He doesn't trust the officer and moreover his passport contains his nationality, home address, travel history which
he doesn't want to reveal, but he still has to provide a proof of identity.
2. Karen wants entry in a bar which requires proof of age. The bouncer standing at gate asks Karen her Driving License.
Driving license has her address on it, which she doesn't want to expose. But she still has to show the ID proof.

In both the cases, there is an unnecessary leak of information. Currently, there is no concrete system to overcome this.

### Proposed methodology: (Solution)

1. Zero knowledge proof (ZKP) is an approach/method that we can use to solve this problem. In ZKP, prover proves his statement or in our case his identity to verifier without revealing it.
2. So our solution goes like this, there will be a centralized trustworthy system. The prover (John/Karen),
will submit their identity proof/supporting document to the system.
3. It will have 2 kits for that document. One will be prover's kit and other will be verifier's kit. Kit is nothing but a program which runs on ZKP algorithm and creates encrypted proof for the document. This proof won't contain any kind of direct value of the original document. So there is no risk involved.
4. Prover's kit will create an encrypted proof. (In first case it will be a valid passport ID and in second cases
it will be confirmation of having age greater than 18 or so.)
5. Verifier's kit will verify the encrypted proof with the help of public key. It will output the confirmation.
6. This way John or Karen can submit their proof of identity without revealing any information.

We will try to implement a generic system which will create verifier's and prover's kit dynamically.
For example, if user wants to create a kit in order to prove his bank balance, then he will submit his balance
and the system will create his kit (prover's kit) for him. On the same line, verifier's kit will be generated.
