package com.portfolio.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.List;
import java.util.Map;

@Service
public class GithubService {

    private final String GITHUB_API_URL = "https://api.github.com/users/moulendra143/repos?type=all&sort=updated&per_page=100";

    public List<Map<String, Object>> getUserRepositories() {
        RestTemplate restTemplate = new RestTemplate();
        List<Map<String, Object>> repos = restTemplate.getForObject(GITHUB_API_URL, List.class);
        if (repos != null) {
            System.out.println("GitHub API: Found " + repos.size() + " repositories.");
        }
        return repos;
    }
}
