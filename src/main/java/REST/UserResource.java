package REST;

import Entities.LoginResponse;
import Facades.UserFacade;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.nimbusds.jose.JOSEException;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("user")
public class UserResource {

    @Path("signup")
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

    @Path("login")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String login(String jsonString) {
        UserFacade facade = new UserFacade();
        Gson gson = new Gson();
        boolean result = false;
        try {
            JsonObject json = new JsonParser().parse(jsonString).getAsJsonObject();
            String userName = json.get("userName").getAsString();
            String password = json.get("password").getAsString();
            System.out.println("USERNAME: " + userName);
            result = facade.login(userName, password);
        } catch (Exception e) {
            result = false;
            throw e;
        }
        LoginResponse response = new LoginResponse(result);
        String json = gson.toJson(response);
        return json;
    }

}
