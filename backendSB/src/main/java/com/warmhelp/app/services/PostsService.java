package com.warmhelp.app.services;

import com.warmhelp.app.dtos.auth.PostsRequest;
import com.warmhelp.app.dtosResponses.CommentsResponseDTO;
import com.warmhelp.app.dtosResponses.PostsResponseDTO;
import com.warmhelp.app.dtosResponses.ResponseCommentsResponseDTO;
import com.warmhelp.app.models.Posts;
import com.warmhelp.app.models.User;
import com.warmhelp.app.models.UserInfo;
import com.warmhelp.app.repositories.PostsRepository;
import com.warmhelp.app.repositories.UserInfoRepository;
import com.warmhelp.app.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PostsService {

    private final PostsRepository postsRepository;
    private final UserRepository userRepository;
    private final UserInfoRepository userInfoRepository;

    public PostsService(PostsRepository postsRepository, UserRepository userRepository, UserInfoRepository userInfoRepository) {
        this.postsRepository = postsRepository;
        this.userRepository = userRepository;
        this.userInfoRepository = userInfoRepository;
    }

    public List<PostsResponseDTO> getAllPosts(){
        return postsRepository.findAll().stream().map(post -> {
            List<CommentsResponseDTO> commentsResponseDTOS = post.getComments().stream().map(comment -> {
                List<ResponseCommentsResponseDTO> responseDTOS = comment.getResponseComments().stream().map(response ->
                        new ResponseCommentsResponseDTO(
                                response.getId(),
                                response.getDescription(),
                                response.getUserInfo().getUser().getUsername(),
                                response.getCreatedAt(),
                                response.getUpdatedAt(),
                                response.getDeletedAt()
                        )
                ).collect(Collectors.toList());

                return new CommentsResponseDTO(
                        comment.getId(),
                        comment.getUserInfo().getUser().getUsername(),
                        comment.getDescription(),
                        responseDTOS,
                        comment.getCreatedAt(),
                        comment.getUpdatedAt(),
                        comment.getDeletedAt()
                );

            }).collect(Collectors.toList());

            return new PostsResponseDTO(
                    post.getId(),
                    post.getTitle(),
                    post.getUserInfo().getUser().getUsername(),
                    post.getDescription(),
                    post.getImage(),
                    commentsResponseDTOS,
                    post.getCreatedAt(),
                    post.getUpdatedAt(),
                    post.getDeletedAt()
            );
        }).collect(Collectors.toList());
    }

    public Optional<Posts> getPostsById(Long id){
        return this.postsRepository.findById(id);
    }

    public Optional<Posts> getPostsByName(String title){
        return this.postsRepository.findByTitle(title);
    }

    public void deletePostById(Long id){
        this.postsRepository.deletePostById(id);
    }


    @Transactional
    public Posts createPost(PostsRequest postFormFront){
        UserInfo userInfo = this.userInfoRepository.findByUser_Username(postFormFront.getUserName())
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        if(this.postsRepository.existsByTitle(postFormFront.getTitle())){
            throw new IllegalArgumentException("Post ya existe");
        }

        Posts post = new Posts();
        post.setTitle(postFormFront.getTitle());
        post.setDescription(postFormFront.getDescription());
        post.setImage(postFormFront.getImage());
        post.setUserInfo(userInfo);

        return this.postsRepository.save(post);
    }


}
