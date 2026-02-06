package com.project.coupleLife.services;

import com.project.coupleLife.exceptions.UserNotFoundException;
import com.project.coupleLife.models.User;
import com.project.coupleLife.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> getUser(String firstname) {
        if (firstname.isEmpty()) {
            throw new UserNotFoundException("Le user n'est pas present");
        } else {
            return userRepository.findByFirstname(firstname);
        }
    }

}
