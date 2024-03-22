package com.example.Favorite;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import com.example.Location.Location;

//import org.springframework.boot.autoconfigure.amqp.RabbitConnectionDetails.Address;

import com.example.User.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
//import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
//import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Favorite")
@Getter
@Setter

public class Favorite {

    @Id
    @Column(name = "FavoriteID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long favoriteId;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "UserID", referencedColumnName = "ID")
    private User user;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "LocationID", referencedColumnName = "ID")
    private Location location;
}
