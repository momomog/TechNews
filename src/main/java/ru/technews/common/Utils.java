package ru.technews.common;

import java.util.Arrays;

public class Utils {

    // Проверка включает ли строка любое совпадение из массива строк
    public static boolean stringContainsItemFromList(String inputStr, String[] items) {
        for (int i = 0; i < items.length; i++)
            items[i] = items[i].toLowerCase();

        return Arrays.stream(items).parallel().anyMatch(inputStr.toLowerCase()::contains);
    }
}
