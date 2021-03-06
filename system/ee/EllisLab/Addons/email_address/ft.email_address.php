<?php
/**
 * This source file is part of the open source project
 * ExpressionEngine (https://expressionengine.com)
 *
 * @link      https://expressionengine.com/
 * @copyright Copyright (c) 2003-2019, EllisLab Corp. (https://ellislab.com)
 * @license   https://expressionengine.com/license Licensed under Apache License, Version 2.0
 */

/**
 * Email Fieldtype
 */
class Email_address_Ft extends EE_Fieldtype {

	/**
	 * @var array $info Legacy Fieldtype info array
	 */
	public $info = array(
		'name'    => 'Email Address',
		'version' => '1.0.0'
	);

	/**
	 * @var bool $has_array_data Whether or not this Fieldtype is setup to parse as a tag pair
	 */
	public $has_array_data = FALSE;

	/**
	 * Validate Field
	 *
	 * @param  array  $data  The email address
	 * @return mixed  TRUE when valid, an error string when not
	 */
	public function validate($data)
	{
		ee()->lang->loadfile('fieldtypes');

		if ($data == '')
		{
			return TRUE;
		}

		$result = ee('Validation')->make(array('email' => 'email'))->validate(array('email' => $data));

		if ( ! $result->isValid())
		{
			$error = $result->getErrors('email');
			return $error['email'];
		}

		return TRUE;
	}

	/**
	 * Display Field
	 *
	 * @param  array   $data  Field data
	 * @return string  Form field
	 */
	public function display_field($data)
	{
		$field = array(
			'name'        => $this->field_name,
			'value'       => $data,
			'placeholder' => 'username@example.com'
		);

		if ($this->get_setting('field_disabled'))
		{
			$field['disabled'] = 'disabled';
		}

		return form_input($field);
	}

	/**
	 * Replace Tag
	 *
	 * @param  string  $data     The email address
	 * @param  array   $params   Variable tag parameters
	 * @param  mixed   $tagdata  The tagdata if a var pair, FALSE if not
	 * @return string  Parsed string
	 */
	public function replace_tag($data, $params = array(), $tagdata = FALSE)
	{
		return ee()->functions->encode_ee_tags($data);
	}

	/**
	 * Replace Tag :mailto
	 *
	 * @param  string  $data     The email address
	 * @param  array   $params   Variable tag parameters
	 * @param  mixed   $tagdata  The tagdata if a var pair, FALSE if not
	 * @return string  Parsed string
	 */
	public function replace_mailto($data, $params = array(), $tagdata = FALSE)
	{
		// use the address as the title if not provided
		$title = (isset($params['title'])) ? $params['title'] : $data;
		$email = (isset($params['subject'])) ? $data.'?subject='.rawurlencode($params['subject']) : $data;


		if ( ! isset($params['encode']) OR get_bool_from_string($params['encode']) != FALSE)
		{
			ee()->load->library('typography');
			ee()->typography->initialize();

			$mailto = ee()->typography->encode_email($email, $title, TRUE);
		}
		else
		{
			$mailto = '<a href="mailto:'.$email.'">'.$title.'</a>';
		}

		return $mailto;
	}

	/**
	 * :url_slug modifier
	 */
	public function replace_url_slug($data, $params = array(), $tagdata = FALSE)
	{
		$email = str_replace(['@','.','+'], [' at ', ' dot ', ' plus '], $data);
		return parent::replace_url_slug($email, $params, $tagdata);
	}

	/**
	 * Accept all content types.
	 *
	 * @param  string  The name of the content type
	 * @return bool    Accepts all content types
	 */
	public function accepts_content_type($name)
	{
		return TRUE;
	}

	/**
	 * Update the fieldtype
	 *
	 * @param string $version The version being updated to
	 * @return boolean TRUE if successful, FALSE otherwise
	 */
	public function update($version)
	{
		return TRUE;
	}
}
// END CLASS

// EOF
