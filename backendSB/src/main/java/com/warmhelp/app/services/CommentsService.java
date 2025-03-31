package com.warmhelp.app.services;

import com.warmhelp.app.dtos.auth.CommentsRequest;
import com.warmhelp.app.models.Comments;
import com.warmhelp.app.models.Posts;
import com.warmhelp.app.models.UserInfo;
import com.warmhelp.app.repositories.CommentsRepository;
import com.warmhelp.app.repositories.PostsRepository;
import com.warmhelp.app.repositories.UserInfoRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentsService {
    private final CommentsRepository commentsRepository;
    private final UserInfoRepository userInfoRepository;
    private final PostsRepository postsRepository;

    public CommentsService(CommentsRepository commentsRepository, UserInfoRepository userInfoRepository, PostsRepository postsRepository) {
        this.commentsRepository = commentsRepository;
        this.userInfoRepository = userInfoRepository;
        this.postsRepository = postsRepository;
    }

    public List<Comments> getAllComments(){
        return this.commentsRepository.findAll();
    }

    public Optional<Comments> getCommentsById(Long id){
        return this.commentsRepository.findById(id);
    }

    public void deleteCommentById(Long id){
        this.commentsRepository.deleteCommentById(id);
    }

    @Transactional
    public Comments createComment(CommentsRequest commentFormFront) {
        // Buscar el usuario
        UserInfo userInfo = this.userInfoRepository.findByUser_Username(commentFormFront.getUserName())
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        // Buscar el post
        Posts post = this.postsRepository.findById(commentFormFront.getPostId())
                .orElseThrow(() -> new IllegalArgumentException("Post no encontrado"));

        // Crear el comentario
        Comments comments = new Comments();
        comments.setDescription(commentFormFront.getDescription());
        comments.setUserInfo(userInfo);
        comments.setPost(post);

        // Guardar el comentario
        return this.commentsRepository.save(comments);
    }


}
