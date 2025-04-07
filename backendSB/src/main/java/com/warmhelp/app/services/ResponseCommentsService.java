package com.warmhelp.app.services;

import com.warmhelp.app.dtos.auth.ResponseCommentsRequest;
import com.warmhelp.app.dtosResponses.ResponseCommentsResponseDTO;
import com.warmhelp.app.models.Comments;
import com.warmhelp.app.models.ResponseComments;
import com.warmhelp.app.models.UserInfo;
import com.warmhelp.app.repositories.CommentsRepository;
import com.warmhelp.app.repositories.ResponseCommentsRespository;
import com.warmhelp.app.repositories.UserInfoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public List<ResponseCommentsResponseDTO> getAllResponseComments(){
        return this.responseCommentsRespository.findAll()
                .stream()
                .map(reponseComments -> new ResponseCommentsResponseDTO(
                        reponseComments.getId(),
                        reponseComments.getDescription(),
                        reponseComments.getUserInfo().getUser().getUsername(),
                        reponseComments.getCreatedAt(),
                        reponseComments.getUpdatedAt(),
                        reponseComments.getDeletedAt()
                ))
                .collect(Collectors.toList());
    }

    public Optional<ResponseComments> getResponseCommentsById(Long id){
        return this.responseCommentsRespository.findById(id);
    }

    public void deleteResponseCommentById(Long id){
        this.responseCommentsRespository.deleteResponseCommentById(id);
    }

    public ResponseCommentsResponseDTO createResponseComment(ResponseCommentsRequest responseFormFront){
        UserInfo userInfo = this.userInfoRepository.findByUser_Username(responseFormFront.getUserName())
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        Comments comment = this.commentsRepository.findById(responseFormFront.getCommentId())
                .orElseThrow(() -> new IllegalArgumentException("Commentario no encontrado"));

        ResponseComments responseComments = new ResponseComments();
        responseComments.setDescription(responseFormFront.getDescription());
        responseComments.setUserInfo(userInfo);
        responseComments.setComments(comment);
        ResponseComments savedResponseComments = this.responseCommentsRespository.save(responseComments);

        return new ResponseCommentsResponseDTO(
                savedResponseComments.getId(),
                savedResponseComments.getDescription(),
                savedResponseComments.getUserInfo().getUser().getUsername(),
                savedResponseComments.getCreatedAt(),
                responseComments.getUpdatedAt(),
                responseComments.getDeletedAt()
        );
    }

}
