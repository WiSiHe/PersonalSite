interface Progress {
  value: number
  max: number
}

const Progress = ({ value, max, ...props }: Progress) => {
  return <progress value={value} max={max} {...props} />
}

export default Progress
