'use client';

export default function SafetyPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">安全与说明</h2>
      </div>

      <div className="card space-y-6">
        {/* 产品说明 */}
        <section>
          <h3 className="text-lg font-medium text-gray-800 mb-3">关于 Hollow</h3>
          <p className="text-gray-600 leading-relaxed">
            Hollow 是一个面向 INFJ / 内向敏感人群的匿名心事树洞。
            这里是一个极简、安全、安静的地方，让你可以写下心事、浏览他人心事，
            获得一点点「被理解」的感觉，但不做重社交。
          </p>
        </section>

        {/* 匿名说明 */}
        <section>
          <h3 className="text-lg font-medium text-gray-800 mb-3">匿名与隐私</h3>
          <p className="text-gray-600 leading-relaxed">
            本产品采用匿名机制，不会收集你的个人信息。
            你可以选择将心事设为「仅自己可见」或「公开给陌生人」。
            所有数据仅存储在本地，不会上传到服务器。
          </p>
        </section>

        {/* 边界说明 */}
        <section>
          <h3 className="text-lg font-medium text-gray-800 mb-3">使用边界</h3>
          <p className="text-gray-600 leading-relaxed">
            本产品仅作为情绪记录与表达空间，不提供专业医疗建议。
            请勿在此发布涉及暴力、违法或伤害他人的内容。
          </p>
        </section>

        {/* 心理求助信息 */}
        <section className="bg-primary-50 border border-primary-200 rounded-card p-4">
          <h3 className="text-lg font-medium text-primary-800 mb-3">重要提示</h3>
          <p className="text-primary-700 leading-relaxed mb-3">
            如有强烈自杀 / 自伤念头，请联系本地专业机构或热线：
          </p>
          <ul className="text-primary-700 space-y-2 text-sm">
            <li>• 全国心理危机干预热线：400-161-9995</li>
            <li>• 北京心理危机研究与干预中心：010-82951332</li>
            <li>• 上海心理援助热线：021-64289888</li>
            <li>• 广州心理危机干预热线：020-81899120</li>
          </ul>
          <p className="text-primary-600 text-sm mt-4">
            请记住，你并不孤单，专业帮助随时可用。
          </p>
        </section>
      </div>
    </div>
  );
}

