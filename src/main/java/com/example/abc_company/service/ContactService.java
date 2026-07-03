package com.example.abc_company.service;

import com.example.abc_company.model.Contact;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ContactService {

    private final List<Contact> contacts = new ArrayList<>();

    public String saveContact(Contact contact) {
        contacts.add(contact);
        return "Contact saved successfully";
    }

    public List<Contact> getAllContacts() {
        return contacts;
    }
}