package ak88.minitestblog.model;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String content;
    private LocalDateTime time;
    @ManyToOne
    private Status status;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }



    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Blog(String title, String content, Status status) {
        this.title = title;
        this.content = content;
        this.status = status;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public Blog(Long id, String title, String content, LocalDateTime time, Status status) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.time = time;
        this.status = status;
    }

    public Blog() {
    }

    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }
}
