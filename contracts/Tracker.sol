// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Tracker{

    struct productDetails{
        string party;
        string supervisorName;
        string productName;
        address callerAddress;
        uint productID;
        uint quantity;
        string date;
        uint price;
    }

    mapping (uint => productDetails) pd;
    mapping (address => string) message;
    event details(productDetails);
    event par(string);
    event supName(string);
    event prodName(string);
    event add(address);
    event prodID(uint);
    event quan(uint);
    event dte(string);
    event pri(uint);
    uint[] IDs;

    function submitData(string memory _party, string memory _supervisorName, string memory _productName, uint _productID, uint _quantity, string memory _date, uint _price) public returns(bool) {
        pd[_productID].party = _party;
        pd[_productID].supervisorName = _supervisorName;
        pd[_productID].productName = _productName;
        pd[_productID].callerAddress = msg.sender; // adress of caller
        pd[_productID].productID = _productID;
        pd[_productID].quantity = _quantity;
        pd[_productID].date = _date;
        pd[_productID].price = _price;
        IDs.push(_productID); // array for storing all the product id's 
        return true;
    }

    function getData(uint _productID) public returns(productDetails memory){   //fetch product details
        emit details(pd[_productID]);
        emit par(pd[_productID].party);       // emit is use for getting the data in backend
        emit supName(pd[_productID].supervisorName);
        emit prodName(pd[_productID].productName);
        emit add(pd[_productID].callerAddress);
        emit prodID(pd[_productID].productID);       // emit is use for getting the data in backend
        emit quan(pd[_productID].quantity);
        emit dte(pd[_productID].date);
        emit pri(pd[_productID].price);
        statusMsg(pd[_productID].callerAddress, "Evereything OK");      // save this acknowlodgement to the caller adress
        return pd[_productID];
    }

    function statusMsg(address _callerAddress, string memory m) internal returns(bool){
        message[_callerAddress] = m;        // store the acknowledgement msg into the caller adress
        return true;
    }

    /* function getAllProducts() public returns(productDetails memory){
        for(uint i=0;i<IDs.length;i++){
            uint id = IDs[i];
            return (pd[id]); 
        }
    } */
    /* struct getData{
        returnDetails(
            string[] party= _party;
            string [] supervisorName=_supervisorName;
            string [] productName= _productName;
            uint productID= _productID;
            uint quantity= _quantity;
            string[] date= _date;
            uint[] price= _price;
        )
        mapping (uint => _productID) pID;
    } */
}