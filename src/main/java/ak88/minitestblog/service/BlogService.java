package ak88.minitestblog.service;

import ak88.minitestblog.model.Blog;
import ak88.minitestblog.model.Status;

public interface BlogService extends iGeneralService<Blog> {
    Iterable<Blog> findAllByStatus(Status status);
    Iterable<Blog> findAllByTitleContaining(String title);
}
