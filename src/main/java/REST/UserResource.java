package REST;

import Facades.UserFacade;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.nimbusds.jose.JOSEException;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("signup")
public class UserResource {

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
//    @Produces(MediaType.APPLICATION_JSON)
    public Response addNewUser(String jsonString) throws JOSEException {
        UserFacade facade = new UserFacade();
        try {
            JsonObject json = new JsonParser().parse(jsonString).getAsJsonObject();
            String userName = json.get("userName").getAsString();
            String password = json.get("password").getAsString();
            String firstName = json.get("firstName").getAsString();
            String lastName = json.get("lastName").getAsString();
            facade.createUser(firstName, lastName, userName, password);
 
        } catch (Exception e) {
                 throw e;
                 }
        return Response.ok().build();      
    }
}