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
        Gson gson = new Gson();
        RegisteredUser user = new RegisteredUser("Frank", "Hansen", "Fancisss", "1293pus");
        UserResource resource = new UserResource();
        resource.addNewUser(gson.toJson(user));       
    }
}
