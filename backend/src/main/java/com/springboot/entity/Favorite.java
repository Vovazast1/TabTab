package com.springboot.entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import com.springboot.entity.Location;

import com.springboot.entity.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Table(name = "Favorite")
@Entity
@Getter
@Setter

public class Favorite {

    @Id
    @Column(name = "FavoriteID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long favoriteId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "UserID", referencedColumnName = "UserID")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "LocationID", referencedColumnName = "LocationID")
    private Location location;

    public long getFavoriteId() {
        return favoriteId;
    }
}






//package com.springboot.Favorite;
//
//import java.io.Serializable;
//
//import jakarta.persistence.Embeddable;
//import lombok.Getter;
//import lombok.Setter;
//
//@Embeddable
//@Getter
//@Setter
//public class FavoriteId implements Serializable{
//   private long userId;
//   private long locationId;
//}