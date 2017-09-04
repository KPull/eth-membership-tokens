pragma solidity ^0.4.13;

contract Application {

    function submitApplication(address _applicant);
    function withdrawApplication(address _applicant);
    function hasOpenApplication(address _applicant) constant returns (bool);

}