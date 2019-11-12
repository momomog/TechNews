


let state = {
    postsList: [{
        id: 1,
        title: 'Kospet Prime — полноценный смартфон в корпусе часов',
        photoURL: 'http://s.4pda.to/rvgGmYc5LQQviIz2z010z1FjoDTj0fWz2Ah7cZ6h.png',
        author: 'Admin Admin',
        description: 'Большинство умных часов позиционируется как дополнительный аксессуар, позволяющий\n' +
            '                        просматривать входящие сообщения и отслеживать физическую активность. В случае с Kospet\n' +
            '                        Prime речь идёт о полноценном смартфоне на запястье. В них есть сразу две камеры, огромный\n' +
            '                        аккумулятор, Android со всеми нужными функциями и возможность установки SIM-карты.',
        publicationTime: '2 дня, 8 часов',
        commentsCount: 4
    },{
        id: 2,
        title: 'Стала известна ключевая характеристика Samsung Galaxy S11',
        photoURL: 'http://s.4pda.to/rvgGmwMz2QXmOVCiJAIpo8h2Sk6cuZySJacli.jpg',
        author: 'Admin Admin',
        description: 'Вслед за первыми слухами о модели процессора будущего флагмана Samsung в сети появилась\n' +
            '}\n' +
            '{                более точная информация о модели процессора, который получит готовящийся к релизу Galaxy S11.\n' +
            '}\n' +
            '{                Новая утечка раскрыла модель CPU, на базе которого будет построен ещё не анонсированный\n' +
            '}\n' +
            '{                гаджет.',
        publicationTime: '5 дней, 2 часа',
        commentsCount: 7
    }],
    currentPostData: {},
    currentPostComments: {},
    currentPostId: '',
    postsCount: 0,
    currentPostsPage: 1,
    currentCommentText: ''
};

export default state;