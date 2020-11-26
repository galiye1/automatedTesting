/**
 * @Description:
 * @author wxj
 * @date 2020-10-12-13:38
 */
import axios from './http'
const serve = {
    getProject(){
        return axios('/project', {
            method: 'get'
        });
    },
    postProject(data){
        return axios('/project',{
            method:'post',
            data:{
                "name":data
            }
        });
    }
}

export default serve
