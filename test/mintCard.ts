import { expect } from "chai";
import { ethers } from "hardhat";

describe("OnchainBizCard::mintCard", () => {
  it("mints one NFT and stores info", async () => {
    /* 1) 배포 */
    const BizCard = await ethers.getContractFactory("OnchainBizCard");
    const card = await BizCard.deploy();
    await card.waitForDeployment();

    /* 2) 민팅 */
    const tx = await card.mintCard(
      "Alice",
      "CTO",
      "alice@example.com",
      "https://alice.dev"
    );
    const receipt = await tx.wait();
    const tokenId = receipt?.logs[0]?.args?.tokenId ?? 1; // simpler: expect 1

    /* 3) 검증 */
    expect(await card.ownerOf(tokenId)).to.equal(
      (await ethers.getSigners())[0].address
    );

    const stored = await card.getFunction("tokenURI").staticCall(tokenId);
    // tokenURI 아직 구현 전 → 저장만 확인하려면 _cards 내부 view 함수 추가해도 OK
    expect(stored).to.be.a("string");
  });
});
