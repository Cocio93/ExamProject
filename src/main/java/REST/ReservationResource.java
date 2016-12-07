/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package REST;

import Entities.ReservationRequest;
import Facades.ReservationFacade;
import com.google.gson.Gson;
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
@Path("reservation/")
public class ReservationResource {

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String makeReservation(ReservationRequest request) throws IOException {
        ReservationFacade facade = new ReservationFacade();
        Gson gson = new Gson();
        return facade.sendRequest(request);
    }

}
