/* 公开/测试版 AI 种子：不含任何私有密钥。用户需在「设置 → 智能AI设置」自行填写 API Key。
   由公开版出包时覆盖 gujian 的 ai_seed.js（古建数据/版本不变，仅置空凭证以防外泄）。 */
window.AI_SEED = {
  apiKey: "",
  default: "minimax-m27-free",
  strategy: { mode: "failover" }
};
