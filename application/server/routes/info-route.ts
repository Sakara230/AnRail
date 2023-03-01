const router = require("express").Router();
import { Request , Response } from 'express';
import {  Wallets , Gateway} from 'fabric-network';
import * as path from 'path';
import * as fs from 'fs';

//  調用petcontract 的 queryallpets 方法 得到目前所有寵物的資料
router.get("/getallpets" , async(req:Request , res:Response ) => {
    try {
        console.log("開始執行查詢所有寵物資料");
        // 載入網路配置
        const ccpPath = path.resolve(__dirname,'../../../network', 'organizations', 'peerOrganizations', 'hospital.anrail.com', 'connection-hospital.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('hoadmin');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'hoadmin', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('railchannel');

        // Get the contract from the network.
        const contract = network.getContract('petcontract');

        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        const result = await contract.evaluateTransaction('queryAllPets');
        const resultjson = result.toString('utf-8');
        //const result = await contract.evaluateTransaction('queryPet', 'PET1');
        res.status(200).json({resultjson});
        console.log(`Transaction has been evaluated, result is: ${resultjson}`);

        // Disconnect from the gateway.
        await gateway.disconnect();
        
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(400).send("evaluate transaction 查詢全部寵物資料失敗...")
    }
});

<<<<<<< Updated upstream
=======
//  調用petcontract 的 createpet 方法 新增寵物的資料
>>>>>>> Stashed changes
router.post("/createpet" , async(req:Request , res:Response ) => {
    try {
        console.log("開始執行創建新的寵物資料");
        // 載入網路配置
        const ccpPath = path.resolve(__dirname,'../../../network', 'organizations', 'peerOrganizations', 'hospital.anrail.com', 'connection-hospital.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('hoadmin');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'hoadmin', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('railchannel');

        // Get the contract from the network.
        const contract = network.getContract('petcontract');

        // Evaluate the specified transaction.
        await contract.submitTransaction('createPet', req.body.chipID, req.body.name, req.body.species, req.body.breed, req.body.owner, req.body.ownerID, req.body.phone, req.body.birthday, req.body.gender, req.body.bloodType, req.body.ligation, req.body.allergy, req.body.majorDiseases, req.body.remark, req.body.hospital);
        console.log('Transaction has been submitted');
        res.status(200).send("evaluate transaction 新增寵物資料成功...");

        // Disconnect from the gateway.
        await gateway.disconnect();
        
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(400).send("evaluate transaction 新增寵物資料失敗...")
    }
});

const getpet = async(req:Request , res:Response ) =>{
    try {
        console.log("開始執行查詢單一寵物資料");
        const { id: chipID } = req.params;
        // 載入網路配置
        const ccpPath = path.resolve(__dirname,'../../../network', 'organizations', 'peerOrganizations', 'hospital.anrail.com', 'connection-hospital.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('hoadmin');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'hoadmin', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('railchannel');

        // Get the contract from the network.
        const contract = network.getContract('petcontract');

        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        const result = await contract.evaluateTransaction('queryPet',chipID);
        const resultjson = result.toString('utf-8');
        //const result = await contract.evaluateTransaction('queryPet', 'PET1');
        res.status(200).json({resultjson});
        console.log(`Transaction has been evaluated, 查詢單隻寵物基本資料交易已送出... result is: ${resultjson}`);

        // Disconnect from the gateway.
        await gateway.disconnect();
        
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(400).send("evaluate transaction 查詢寵物資料失敗...")  
    }
}

const changepetinfo = async(req:Request , res:Response ) =>{
    try {
        console.log("開始執行更改寵物基本資料");
        const { id: chipID } = req.params;
        // 載入網路配置
        const ccpPath = path.resolve(__dirname,'../../../network', 'organizations', 'peerOrganizations', 'hospital.anrail.com', 'connection-hospital.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('hoadmin');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'hoadmin', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('railchannel');

        // Get the contract from the network.
        const contract = network.getContract('petcontract');

        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        await contract.submitTransaction('changePetInfo', chipID, req.body.name, req.body.species, req.body.breed, req.body.owner, req.body.ownerID, req.body.phone, req.body.birthday, req.body.gender, req.body.bloodType, req.body.ligation, req.body.allergy, req.body.majorDiseases, req.body.remark, req.body.hospital);
        console.log('Transaction has been submitted 更改寵物基本資料交易已送出...');
        res.status(200).send("evaluate transaction 更新寵物資料成功...")

        // Disconnect from the gateway.
        await gateway.disconnect();
        
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(400).send("evaluate transaction 更新寵物資料失敗...")  
    }
}

router.route("/:id").get(getpet).patch(changepetinfo);



module.exports = router;

