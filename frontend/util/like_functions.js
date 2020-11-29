export const videoLikeValue = likes => {
    var totalLikes = 0;
    var likeTotal = 0;
    var dislikeTotal = 0;

    if (likes){
        Object.values(likes).forEach(like => {
            if(like.likeable_type === "Video") {
                totalLikes += 1;
                if(like.liked_value === 1){
                    likeTotal += like.liked_value
                }else if (like.liked_value === -1){
                    dislikeTotal -= like.liked_value
                }
            }
        })
    }
    return{ totalLikes: totalLikes, upvotes: likeTotal, downvotes: dislikeTotal}
}