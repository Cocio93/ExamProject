/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package REST;

import Entities.RegisteredUser;
import com.google.gson.Gson;
import com.nimbusds.jose.JOSEException;
import java.text.ParseException;

/**
 *
 * @author John
 */
public class ResourceTester {

    public static void main(String[] args) throws ParseException, JOSEException {
        String json = "{userName: 'Cocio93', password: 'klippe'}";
        UserResource resource = new UserResource();
        resource.login(json);       
    }
}
