//Creates a timeline to chain together multiple animations 

const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

// Makes the initial text appear from the bottom //
tl.to(".text", { y: "0%", duration: 1, stagger: 0.25 });

//Makes a grey slider come from the bottom to the top//
tl.to(".slider", { y: "-100%", duration: 1.5, delay: 0.5 });

//This then moves up the black slider bottom to the top//
tl.to(".intro", { y: "-100%", duration: 1 }, "-=1");