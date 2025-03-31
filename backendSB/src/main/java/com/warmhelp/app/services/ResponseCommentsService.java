package com.warmhelp.app.services;

import com.warmhelp.app.dtos.auth.ResponseCommentsRequest;
import com.warmhelp.app.models.Comments;
import com.warmhelp.app.models.ResponseComments;
import com.warmhelp.app.models.UserInfo;
import com.warmhelp.app.repositories.CommentsRepository;
import com.warmhelp.app.repositories.ResponseCommentsRespository;
import com.warmhelp.app.repositories.UserInfoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ResponseCommentsService {
    private final CommentsRepository commentsRepository;
    private final ResponseCommentsRespository responseCommentsRespository;
    private final UserInfoRepository userInfoRepository;

    public ResponseCommentsService(CommentsRepository commentsRepository, ResponseCommentsRespository responseCommentsRespository, UserInfoRepository userInfoRepository) {
        this.commentsRepository = commentsRepository;
        this.responseCommentsRespository = responseCommentsRespository;
        this.userInfoRepository = userInfoRepository;
    }

    public List<ResponseComments> getAllResponseComments(){
        return this.responseCommentsRespository.findAll();
    }

    public Optional<ResponseComments> getResponseCommentsById(Long id){
        return this.responseCommentsRespository.findById(id);
    }

    public void deleteResponseCommentById(Long id){
        this.responseCommentsRespository.deleteResponseCommentById(id);
    }

    public ResponseComments createResponseComment(ResponseCommentsRequest responseFormFront){
        UserInfo userInfo = this.userInfoRepository.findByUser_Username(responseFormFront.getUserName())
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        Comments comment = this.commentsRepository.findById(responseFormFront.getCommentId())
                .orElseThrow(() -> new IllegalArgumentException("Commentario no encontrado"));

        ResponseComments responseComments = new ResponseComments();
        responseComments.setDescription(responseFormFront.getDescription());
        responseComments.setUserInfo(userInfo);
        responseComments.setComments(comment);
        return this.responseCommentsRespository.save(responseComments);
    }

}
