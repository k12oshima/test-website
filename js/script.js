document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------------------
    // ⚠️ 注意: 実際のUnsplash APIキーに置き換える必要があります
    // -----------------------------------------------------
    const UNSPLASH_ACCESS_KEY = 'YOUR_UNSPLASH_ACCESS_KEY'; 

    // ヒーロー画像の動的ロード (信頼感・ビジネスをテーマに)
    const heroSection = document.querySelector('.hero-section');
    const heroImageContainer = document.getElementById('hero-image');

    // ヒーロー画像のロード関数
    async function loadHeroImage() {
        if (!heroImageContainer) return;

        const apiUrl = `https://api.unsplash.com/photos/random?query=business,collaboration,professional&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Unsplash APIから画像をロードできませんでした');
            }
            const photo = await response.json();
            
            // 高解像度（1920px幅）の画像URLを取得
            const imageUrl = photo.urls.regular.replace('w=1080', 'w=1920'); 
            const photographer = photo.user.name;

            // 既存のプレースホルダーを置き換え
            const imgElement = heroImageContainer.querySelector('img');
            imgElement.src = imageUrl;
            imgElement.alt = `Photo by ${photographer} on Unsplash`;
            
            // 著作権表示をフッターなどに追加することを推奨
            // console.log(`Photo credit: ${photographer} / Unsplash`);

        } catch (error) {
            console.error("画像の読み込みエラー:", error);
            // エラー時もデフォルトの静的画像が残るため、デザインは崩れない
        }
    }

    // ヒーロー画像をロード (キーがあれば実行)
    if (UNSPLASH_ACCESS_KEY !== 'YOUR_UNSPLASH_ACCESS_KEY') {
        loadHeroImage();
    }


    // スクロール時のアニメーション (モダンなサイトでよく使われる演出)
    const targets = document.querySelectorAll('.section-title, .value-item, .service-card, .news-list li');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1 // 10%が見えたら発火
    });

    targets.forEach(target => {
        target.classList.add('fade-target'); // CSSで非表示にしておくクラス
        observer.observe(target);
    });

    // CSSアニメーション用クラスをstyle.cssに追加してください
    /*
    .fade-target {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }
    */
});