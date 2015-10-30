import PlansActions from '../../actions/PlansActions';
import PlansStore from '../../stores/PlansStore';

const CREATE_PLAN_URL = 'plans/new';
const LIST_PLANS_URL = 'plans/lists';

export default {
  choosePlanOrRedirect(props) {
    if(props.params.planName) {
      PlansActions.choosePlan(props.params.planName);
    }
    else {
      let url = (PlansStore.getPlanNames().length < 1) ? CREATE_PLAN_URL : LIST_PLANS_URL;
      props.history.pushState(null, url);
    }
  }
}
