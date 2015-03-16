<?php
/**
* Classe représentant un team
*/
class Team
{
    //Id du team
	private $_id;
	//Nom du team
	private $_name;
	//Array contenant la liste des participants
	private $_members;

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
			throw new InvalidArgumentException('Le nom du team ne peut pas être vide');

		$this->_name = $name;
	}

	public function getMembers()
    {
        return $this->_members;
    }

    public function setMembers($members)
    {
        $this->_members = $members;
    }
}
?>