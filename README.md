# Project-Team-24 (New Idea on Zero Knowledge Proof)

# Idea: Zero knowledge proof authentication for various usecases (Age Confirmation, Passport ID verification, Bank Balance verification)

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

# Idea 2 (Outside ZKP):

# Idea: Sustainability App (Idea is taken from Professor Ranjan's blog)

### Current Situation: (The Problem)
* You notice everyday in Facebook, or any social media, someone posts a nice clever idea to recycle a plastic bottle or cardboard box to make something  new and usable. But only few people see this idea, they like it and that is it. It does not reach to all community, and because of that many such good ideas go in vain.

### Proposed Methodology: (Solution)

* Why not develop a platform where these ideas are posted and rated by the users. Ideas can be searched by various facets and can provide steps and may link a YouTube video. The novelty and innovation is to provide easy way to share ideas and encourage users to make them. App should also highlight the cost benefits of doing  it.

# Project-Team-24 none approved, here is what I am giving you to explore and submit a practical use case of ZKP
Read this: https://zkp.science/

### Student Names:
  * Amit Bharadia
  * Nitish Joshi
  * Rohan Kamat
  * Shubham Sawant

### Team Name: Code Monks

### Project Idea #1:
  * Project title: **Traffic Accident Alert and Analytics System**
  * Project description:
    Features real time streaming and analysis of data, accompanied with alert notification to the users.
  * Proposed methodology/ resources, etc:
    Read and analyze real time traffic accident data fetched from the control rooms. Provide an alert system for the user, notifying them of major accidents. Provide analytics and comparisons on historical and real time data feed of major accidents with respect to socio-economic factors.

### Project Idea #2:
  * Project title: **Disaster Recovery Assistant**
  * Project description:
    A chat bot to assist disaster struck victims. Assist with nearest safehouses such as medical services, food supplies, provide disaster information, announcements, available public transport, alert to response teams, traffic conditions, etc.
  * Proposed methodology/ resources, etc:
    Create a web application in the form of a chatbot using the IBM Bluemix service to provide assistance to the user during a disaster. The user can interact with the chatbot to quickly gain information about the current situation including the whereabouts of various safehouses.
