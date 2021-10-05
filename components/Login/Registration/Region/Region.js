import styles from './styles.module.scss'


const Region = ({form, modal, setModal}) => {


  return <div className={styles.region}>
    <input
      placeholder={"Выбор региона"}
      onClick={() => setModal(!modal)}
      type="text"
      value={form.region.name}
      readOnly={true}
    />
  </div>
}

export default Region;