export default {
    'logo': 'https://upload.wikimedia.org/wikipedia/commons/0/03/Cm-logo-200x200.jpg',
    'dataEndpoint':  'http://jsonplaceholder.typicode.com/',
    'users': [
        { id: 1, name: 'Królowa śniegu' },
        { id: 2, name: 'Brązowy cukier' },
        { id: 3, name: 'Mitsubishi' },
    ],
    'breadcrumbs': [
        {
            path: '/',
            generateBreadcrumbs: () => [
                { text: 'Main page' },
            ],
        },
        {
            path: '/posts/add/',
            generateBreadcrumbs: () => [
                { path: '/', text: 'Main page' },
                { text: 'New post' },
            ],
        },
        {
            path: '/posts/edit/:id',
            dataSelector: state => state.posts,
            generateBreadcrumbs: (posts, matchParams) => {
                const titleLength = 14;

                const breadcrumbs = [
                    { path: '/', text: 'Main page' },
                ];
                // If 'id' is not provided, then it means that another component has not set it to store yet.
                if ('id' in matchParams) {
                    const idAsNum = parseInt(matchParams.id);
                    const post = posts.find(post => post.id === idAsNum);
                    let breadcrumbText = '/post does not exist/';
                    if (typeof post === 'undefined') {
                        if (posts.length !== 0) {
                            // If post is not provided, and array is empty, it means that posts' data wasn't populated.
                            alert(`Cannot make breadcrumbs. Post does not exist (id: ${matchParams.id}).`);
                        }
                    }
                    else {
                        const truncatedTitle = post['title'].substring(0, titleLength - 1);
                        const threeDots = (post['title'].length <= titleLength ? '' : '...');
                        breadcrumbText = `${truncatedTitle}${threeDots} (${post['id']})`;
                    }
                    breadcrumbs.push({ text: breadcrumbText });
                }
                return breadcrumbs;
            },
        },
    ],
};