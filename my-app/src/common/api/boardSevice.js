const starredBoards = 
    [
      {
        boardName: 'Dating app development 1',
        boardWorkspace: 'App development',
        avatar: 'https://static.halongtrip.net/static/img/tourngamhhbuatoi_small_2.png'
      },
      {
        boardName: 'Foody app development 2',
        boardWorkspace: 'App development',
        avatar: 'https://static.halongtrip.net/static/img/tourngamhhbuatoi_small_1.png'
      },
      {
        boardName: 'Grab app development 3',
        boardWorkspace: 'App development',
        avatar: 'https://static.halongtrip.net/static/img/tourngamhhbuatoi_small_3.png'
      },
      {
        boardName: 'Momo app development 4',
        boardWorkspace: 'App development',
        avatar: 'https://static.halongtrip.net/static/img/tourngamhhbuatoi_small_4.png'
      },
      {
        boardName: 'Bee app development 5',
        boardWorkspace: 'App development',
        avatar: 'https://static.halongtrip.net/static/img/tourngamhhbuatoi_small_1.png'
      }
    ]
    const getStarredBorad = (page, size) => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve({
              totalPage: 100,
              content: starredBoards.slice(page*size,page*size+size)
            });
          }, 3000);
        });
      };
const boardSevice ={
    getStarredBorad
}
export default boardSevice