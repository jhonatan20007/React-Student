import axios from 'axios';

export class PersonaService{
    getAll(){
        return axios.get('http://localhost:8080/api/v1/student').then(result => result.data);
    }



    save(persona){
      return axios({
            method: 'post',
            url: 'http://localhost:8080/api/v1/student',
            headers: {},
            data: persona
          });
        // console.log(persona);
        // return axios.post('http://localhost:8080/api/v1/student').then(result => result.data );
    }
}
