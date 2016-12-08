/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Facades;

import REST.FlightResource;
import java.text.ParseException;

/**
 *
 * @author John
 */
public class FacadeTester {

    public static void main(String[] args) throws ParseException {
        UserFacade facade = new UserFacade();
        facade.createUser("Hans", "Oskar", "Hansii", "thisisapassword");
    }
}
