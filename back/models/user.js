module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', { // 테이블명은 users로 생성된다.
      nickname: {
        type: DataTypes.STRING(20), // 20글자 이하
        allowNull: false,           // 필수
      },
      userId: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true, // 고유한 값
      },
      password: {
        type: DataTypes.STRING(100), // 100글자 이하
        allowNull: false,
        // tableName: 'posts' <- 이런 식으로 직접 이름을 정할 수 있다.
      },
    }, {
      charset: 'utf8',
      collate: 'utf8_general_ci', // 한글이 저장돼요
    });
  
    User.associate = (db) => {
      db.User.hasMany(db.Post, { as: 'Posts' });
      db.User.hasMany(db.Comment);
      db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
      db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'followingId' });
      db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'followerId' });
    };
  
    return User;
  };

  /*
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
    
    const user = {
      id; 1,
      nickname: 'zerocho',
      Liked: [{게시글1}, {게시글2}, {게시글3}]    // as의 이름으로 가져올 수 있다.
      Followers: [{사용자1}, {사용자2}]
    }
  */ 