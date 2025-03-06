package com.smartcater.smartcater_spring.Service;

import com.smartcater.smartcater_spring.Model.MenuItem;
import com.smartcater.smartcater_spring.Repo.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuItemService {

    @Autowired
    private MenuItemRepository menuItemRepository;

    public MenuItem saveMenuItem(MenuItem menuItem) {
        return menuItemRepository.save(menuItem);
    }

    public List<MenuItem> getAllMenuItems() {
        return menuItemRepository.findAll();
    }

    public MenuItem getMenuItemById(String id) {
        return menuItemRepository.findById(id).orElse(null);
    }

    public void deleteMenuItem(String id) {
        menuItemRepository.deleteById(id);
    }
}