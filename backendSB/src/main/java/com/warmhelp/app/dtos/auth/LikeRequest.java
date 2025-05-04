package com.warmhelp.app.dtos.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LikeRequest {
    private Long postId;
    private Long userId;

    public LikeRequest(Long postId, Long userId) {
        this.postId = postId;
        this.userId = userId;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
