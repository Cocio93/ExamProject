/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package REST;

import Entities.ReservationRequest;
import Facades.ReservationFacade;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.io.IOException;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author John
 */
@Path("reservation")
public class ReservationResource {

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String makeReservation(String info) throws IOException {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        JsonObject o = new JsonParser().parse(info).getAsJsonObject();
        ReservationRequest request = gson.fromJson(o, ReservationRequest.class);
        
        ReservationFacade facade = new ReservationFacade();
        String response = facade.sendRequest(request);
        JsonObject prettyObj = new JsonParser().parse(response).getAsJsonObject();
        return gson.toJson(prettyObj);

    }

}
