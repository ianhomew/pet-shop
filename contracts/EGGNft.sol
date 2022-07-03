// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

// import "https://github.com/nibbstack/erc721/blob/v2/src/contracts/tokens/nf-token-metadata.sol";
import "@0xcert/ethereum-erc721/src/contracts/tokens/nf-token-metadata.sol";
import "@0xcert/ethereum-erc721/src/contracts/math/safe-math.sol";
// import "https://github.com/nibbstack/erc721/blob/v2/src/contracts/tokens/nf-token-metadata.sol";
// import "https://github.com/nibbstack/erc721/blob/v2/src/contracts/math/safe-math.sol";
 
contract EGGNft is NFTokenMetadata {
  using SafeMath for uint;
  
  address[16] public minters;
  uint private nextMintIndex;
  uint private _totalSupply;

  constructor() public {
    nftName = "Baby Egg";
    nftSymbol = "BEGG";
    _totalSupply = 16;
  }
 
  function adopt(string calldata _uri) external returns (uint256) {
    require(nextMintIndex <= 15, 'Mint Finished');
    uint256 tokenId = mint(msg.sender, nextMintIndex, _uri);
    nextMintIndex = nextMintIndex.add(1);
    minters[tokenId] = msg.sender;

    return tokenId;
  }
  function mint(address _to, uint256 _tokenId, string memory _uri) internal returns (uint256) {
    super._mint(_to, _tokenId);
    super._setTokenUri(_tokenId, _uri);

    return _tokenId;
  }

  function getNextMintIndex() public view returns(uint) {
    return nextMintIndex;
  }

  function totalSupply() public view returns (uint) {
      return _totalSupply;
  }
}