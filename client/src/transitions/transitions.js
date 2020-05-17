import Highway from '@dogstudio/highway';
import { TimelineLite } from "gsap/TimelineLite";

class Fade extends Highway.Transition {
    in({ from, to, done }) {
        const tl = new TimelineLite();
        tl.to(from, 2, {
            scaleX: 1.5,
            scaley: 1.5,
            onComplete: function () {
                done();
            }
        });
    }
    out({ from, done, to }) {

    }
}

export default Fade;