const FAQ = () => {
  const navs = [
    {
      title: 'What is Contter?',
      key: 'contter',
      desc: () => {
        // return <div>TA collaborative platform, где каждый может создать, продать и купить NFT творения.</div>;
        return (
          <div>
            <p>The web3 design platform and NFT marketplace on the Tezos blockchain</p>
          </div>
        );
      }
    },
    {
      title: 'What makes Contter different from others?',
      key: 'different',
      desc: () => {
        return <div>Тем, что каждое творение уникально. Каждый параметр минтед токена, не может использоваться дважды в создание любого другого творения.</div>;
      }
    },
    {
      title: 'How do i mint?',
      key: 'mint',
      desc: () => {
        return (
          <div>
            Перейдите на страницу создания творения, где вам будет доступен редактор и ассеты*. Далее следуйте подсказками.
            <br />
            Вы не можете загружать свои творения из-за пределов платформы (кроме ассетов).
            <br />
            *В бета версии можно использовать только один ассет.
          </div>
        );
      }
    },
    {
      title: 'What is assets?',
      key: 'assets',
      desc: () => {
        return (
          <div>
            Это любой айтем (инструмент) который можно использовать в редакторе для создания своего творения. <br />
            Ассет создается вне платформы с помощью SDK (подробнее на странице создания ассета).
          </div>
        );
      }
    },
    {
      title: 'How the editor works?',
      key: 'editor',
      desc: () => {
        return <div>Это среда из ассетов, инструментов и дополнительных фич, способствующие простому и понятному созданию своего творения.</div>;
      }
    },
    {
      title: 'How do royalties work?',
      key: 'royalties',
      desc: () => {
        return (
          <div>
            Для создателя творения 0-20%. Для создателя ассета 0-20% (при использование больше одного ассета в творении: роялти делится исходя из процентов
            каждого создателя ассета из общей суммы процентов, но не больше 20%).
          </div>
        );
      }
    },
    {
      title: 'Are there platform fees?',
      key: 'fees',
      desc: () => {
        return <div>3% за транзакцию.</div>;
      }
    },
    {
      title: 'What about the copyright?',
      key: 'copyright',
      desc: () => {
        return (
          <div>
            Все творения принадлежат создателю творения. Создателю ассета принадлежит своей собственный ассет, но не творения созданные с помощью его ассета. В
            случае если вы думаете, что кто-то или что-то нарушает авторские права, напишите нам.
          </div>
        );
      }
    },
    {
      title: 'What technologies are used?',
      key: 'technologies',
      desc: () => {
        return <div>Платформа основана на Тезос-блокчейне, для хранения используется IPFS, обработка идет через Pinata.</div>;
      }
    },
    {
      title: 'What are the future plans?',
      key: 'future',
      desc: () => {
        return (
          <div>Перейти к стабильной версии платформы. Планируется поддержка нескольких ассетов, что позволит создавать еще более потрясающие творения.</div>
        );
      }
    },
    {
      title: 'What do you mean by beta version?',
      key: 'beta',
      desc: () => {
        return (
          <div>
            Могут быть баги и ошибки, приносим свои извинения. Ограничен функционал; не работает редактирование профиля; редактирования своего контента.
          </div>
        );
      }
    },
    {
      title: 'Остались еще вопросы?',
      key: 'questions',
      desc: () => {
        return <div>Свяжитесь с нами по почте support@contter.com или перейти в наш дискорд сервер.</div>;
      }
    }
  ];

  return (
    <div className={'space-y-6 font-normal'}>
      <h2 className={'text-2xl mb-10'}>Frequently asked questions</h2>
      {navs.map((a) => (
        <div id={a.key} key={a.key}>
          <h2 className={'text-lg'}>{a.title}</h2>
          <div className={' text-inactive'}>{a.desc()}</div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
