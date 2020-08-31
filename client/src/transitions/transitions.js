export const transition = { ease: [0.43, 0.13, 0.23, 0.96] }

export const movieDetailsVariant = {
  hidden: {
    y: 0
  },
  show: {
    y: 0,
    transition: {
      staggerChildren: 0.1,
      staggerDirection: 1
    }
  }
}

export const movieDetailsChildren = {
  hidden: {
    opacity: 0,
    y: 20
  },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ...transition }
  }
}