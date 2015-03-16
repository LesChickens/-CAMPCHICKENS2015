<?php
/**
* Classe représentant un membre
*/
class Member
{
    //Id du membre
	private $_id;
	//Nom du membre
	private $_name;
	//Prénom du membre
    private $_firstName;
    //Prénom du membre
    private $_teamId;
    //Prénom du membre
    private $_email;



	public function getId()
	{
		return $this->_id;
	}

	public function setId($id)
	{
		if(!is_numeric($id))
			throw new InvalidArgumentException("L\'id doit être numérique" );

		$this->_id = $id;
	}

	public function getName()
	{
		return $this->_name;
	}

	public function setName($name)
	{
		if(empty($name))
			throw new InvalidArgumentException('Le nom du membre ne peut pas être vide');

		$this->_name = $name;
	}

	public function getFirstName()
    {
        return $this->_firstName;
    }

    public function setFirstName($firstName)
    {
        if(empty($firstName))
            throw new InvalidArgumentException('Le prénom du membre ne peut pas être vide');

        $this->_firstName = $firstName;
    }

    /**
    * @return mixed
    */
    public function getEmail()
    {
        return $this->_email;
    }

    /**
     * @param mixed $email
     */
    public function setEmail($email)
    {
        $this->_email = $email;
    }

    /**
     * @return mixed
     */
    public function getTeamId()
    {
        return $this->_teamId;
    }

    /**
     * @param mixed $teamId
     */
    public function setTeamId($teamId)
    {
        $this->_teamId = $teamId;
    }
}

?>