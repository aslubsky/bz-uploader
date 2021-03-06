<?php

namespace Bazalt\Uploader\Exception;


/**
 * UploaderException
 *
 * @category Uploader
 * @package  BAZALT/Uploader
 * @author   Alex Slubsky <aslubsky@gmail.com>
 * @license  http://www.opensource.org/licenses/lgpl-license.php LGPL
 * @version  Release: $Rev: 20 $
 * @link     http://www.php-solves.com/
 */
class Form extends \Exception
{
    /**
     * __construct
     *
     * @param int $code РљРѕРґ РїРѕРјРёР»РєРё
     */
    public function __construct($code)
    {
        $message = $this->codeToMessage($code);
        parent::__construct($message, $code);
    }

    /**
     *
     * РџРѕРІРµСЂС‚Р°С” С‚РµРєСЃС‚ РїРѕРІС–РґРѕРјР»РµРЅРЅСЏ РІС–РґРїРѕРІС–РґРЅРѕ РєРѕРґСѓ РїРѕРјРёР»РєРё
     *
     * @param int $code РљРѕРґ РїРѕРјРёР»РєРё
     *
     * @return string
     */
    private function codeToMessage($code)
    {
        switch ($code) {
            case UPLOAD_ERR_INI_SIZE:
                $message = 'The uploaded file exceeds the upload_max_filesize directive in php.ini';
                break;
            case UPLOAD_ERR_FORM_SIZE:
                $message = 'The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form';
                break;
            case UPLOAD_ERR_PARTIAL:
                $message = 'The uploaded file was only partially uploaded';
                break;
            case UPLOAD_ERR_NO_FILE:
                $message = 'No file was uploaded';
                break;
            case UPLOAD_ERR_NO_TMP_DIR:
                $message = 'Missing a temporary folder';
                break;
            case UPLOAD_ERR_CANT_WRITE:
                $message = 'Failed to write file to disk';
                break;
            case UPLOAD_ERR_EXTENSION:
                $message = 'File upload stopped by extension';
                break;

            default:
                $message = 'Could not save uploaded file. The upload was cancelled, or server error encountered';
                break;
        }
        return $message;
    }
}