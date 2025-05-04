package com.warmhelp.app.dtosResponses;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LikeResponse {
    private boolean liked;
    private Long totalLikes;

    public LikeResponse(boolean liked, Long totalLikes) {
        this.liked = liked;
        this.totalLikes = totalLikes;
    }

    public boolean isLiked() {
        return liked;
    }

    public void setLiked(boolean liked) {
        this.liked = liked;
    }

    public Long getTotalLikes() {
        return totalLikes;
    }

    public void setTotalLikes(Long totalLikes) {
        this.totalLikes = totalLikes;
    }
}
