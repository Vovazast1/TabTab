//package com.springboot.favorite;
//
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//
//import com.springboot.location.Location;
//
//import com.springboot.user.User;
//
//import jakarta.persistence.Column;
//import jakarta.persistence.Entity;
//import jakarta.persistence.FetchType;
//import jakarta.persistence.Id;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.ManyToOne;
//import jakarta.persistence.Table;
//import lombok.Getter;
//import lombok.Setter;
//
//@Entity
//@Table(name = "Favorite")
//@Getter
//@Setter
//
//public class Favorite {
//
//    @Id
//    @Column(name = "FavoriteID")
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private long favoriteId;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "UserID", referencedColumnName = "UserID")
//    private User user;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "LocationID", referencedColumnName = "LocationID")
//    private Location location;
//}
