import React from 'react';

class Terms extends React.Component {
    render(){
        return(
            <div className='terms'>
                <div>
                <h1 >إرشادات الاستخدام</h1>
                <p >نحن سعداء بتقديم المساعدة لك، لقد وضعنا هذه الضوابط والإرشادات لتحصل على تجربة أفضل عند استخدامك الفضاء العربي. هذه الإرشادات ستجعل سؤالك قابلا للإجابة بشكل أسرع وأفضل، كما ستجعل الإجابة أوضح وأكثر إفادة لباقي المستخدمين.</p>
                <h1>إرشادات طرح الأسئلة</h1>
                <hr/>
                <h3>البحث قبل السؤال</h3>
                <p>قبل طرح أي سؤال على الفضاء العربي، جرب دائما البحث ضمن الأسئلة المطروحة سابقا، أو ضمن المقالات المنشورة، فربما سبقك أحد ما بطرح السؤال نفسه وتلقى ردا عليه، أو قام أحد كتاب الأكاديمية بنشر مقال حول الموضوع الذي تسأل عنه. في حال وجدت شخصا آخر قام بطرح السؤال نفسه ولم يتلق جوابا عليه بعد، فيمكنك التصويت بالإيجاب لصالح ذلك السؤال حتى تمنحه فرصة أكبر لتلقي إجابة، وحتى نتجنب تكراره.</p>
                <h3>الدقة عند طرح السؤال</h3>
                <p>اجعل سؤالك واضحا ومحددا ويقبل إجابة واحدة، وتجنب الأسئلة المبهمة غير الواضحة والتي تحتمل أكثر من جواب، أو تلك الأسئلة التي تكون أنسب لفتح نقاشات وليس لتلقي إجابات، كطلب الآراء مثلا.</p>
                <h4>:أمثلة على عناوين أسئلة سيئة</h4>
                <ul>
                    <li dir='auto'>أحتاج مساعدة بلغة PHP</li>
                    <li dir='auto'>ما هي أفضل لغة برمجة؟</li>
                    <li dir='auto'>ما رأيكم في هذا التصميم؟</li>
                </ul>

                <h4>:أمثلة على عناوين أسئلة جيدة</h4>
                <ul>
                    <li dir='auto'>كيف يمكنني الاتصال بقاعدة بيانات MySQL من خلال PHP PDO؟</li>
                    <li dir='auto'>كيف أقوم بإدراج ملف css داخل ملف css آخر؟</li>
                    <li dir='auto'>ما هو الفرق بين Photoshop وIllustrator؟</li>
                </ul>

                <h3>توضيح صياغة السؤال</h3>
                <p>اجعل لغتك فصيحة وواضحة عند طرح سؤالك، وابدأ بعنوان يعطي فكرة كافية عن موضوع السؤال، ثم قدم كل المعلومات الضرورية حول المشكل الذي يواجهك حتى تساعد الأعضاء على تقديم الإجابة الأفضل، واجعل لغتك خالية من الأخطاء اللغوية والإملائية ولا تهمل علامات الترقيم، لأن ذلك يساعد على فهم السؤال ويشجع على الإجابة عليه. في تفاصيل السؤال اكتب مقدمة توضح سياق المشكل، ولا تكتفي فقط بإعادة كتابة العنوان. كلما كانت هناك تفاصيل أكثر كلما كان أفضل.</p>
                </div>
    
            </div>
        )
    }
}

export default Terms;