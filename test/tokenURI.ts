import { expect } from "chai";
import { ethers } from "hardhat";
import { Buffer } from "buffer";

describe("OnchainBizCard::tokenURI", () => {
  it("returns valid Base64-JSON with embedded SVG", async () => {
    const BizCard = await ethers.getContractFactory("OnchainBizCard");
    const card = await BizCard.deploy();
    await card.waitForDeployment();

    await card.mintCard(
      "Alice", "CTO", "alice@example.com", "https://alice.dev"
    );

    const uri = await card.tokenURI(1);
    expect(uri.startsWith("data:application/json;base64,")).to.be.true;

    /* 디코딩 → JSON 파싱 */
    const b64 = uri.split(",")[1];
    const json = JSON.parse(Buffer.from(b64, "base64").toString());
    expect(json.name).to.equal("Alice");
    expect(json.image.startsWith("data:image/svg+xml;base64,")).to.be.true;
  });
});
